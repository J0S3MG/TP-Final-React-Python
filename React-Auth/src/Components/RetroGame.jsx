import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { PlayArrow, Replay } from '@mui/icons-material';

function RetroGame({ onScoreUpdate }) {
  const [gameState, setGameState] = useState('ready'); // ready, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const gameRef = useRef(null);
  const animationRef = useRef(null);
  const obstacleIdRef = useRef(0);

  // Cargar high score del localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('retro_game_high_score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Saltar con espacio o click
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && gameState === 'playing' && !isJumping) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isJumping]);

  const jump = () => {
    if (isJumping) return;
    
    setIsJumping(true);
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      jumpHeight += 5;
      setPlayerY(jumpHeight);
      
      if (jumpHeight >= 100) {
        clearInterval(jumpInterval);
        // Caída
        const fallInterval = setInterval(() => {
          jumpHeight -= 5;
          setPlayerY(jumpHeight);
          
          if (jumpHeight <= 0) {
            clearInterval(fallInterval);
            setPlayerY(0);
            setIsJumping(false);
          }
        }, 20);
      }
    }, 20);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setObstacles([]);
    setPlayerY(0);
    setIsJumping(false);
    obstacleIdRef.current = 0;
    gameLoop();
  };

  const gameLoop = () => {
    let frameCount = 0;
    let currentScore = 0;

    const animate = () => {
      frameCount++;
      
      // Crear obstáculos cada 100 frames (ajustable)
      if (frameCount % 100 === 0) {
        const newObstacle = {
          id: obstacleIdRef.current++,
          x: 100,
        };
        setObstacles(prev => [...prev, newObstacle]);
      }

      // Mover obstáculos
      setObstacles(prev => {
        return prev
          .map(obs => ({ ...obs, x: obs.x - 2 }))
          .filter(obs => obs.x > -10);
      });

      // Incrementar score
      if (frameCount % 10 === 0) {
        currentScore++;
        setScore(currentScore);
      }

      // Verificar colisiones
      setObstacles(prev => {
        const collision = prev.some(obs => {
          const playerLeft = 15;
          const playerRight = 25;
          const obsLeft = obs.x;
          const obsRight = obs.x + 5;
          
          return (
            playerRight > obsLeft &&
            playerLeft < obsRight &&
            playerY < 30
          );
        });

        if (collision) {
          endGame(currentScore);
          return prev;
        }
        return prev;
      });

      if (gameState === 'playing') {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const endGame = (finalScore) => {
    setGameState('gameOver');
    
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('retro_game_high_score', finalScore.toString());
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Callback para actualizar actividad reciente
    if (onScoreUpdate) {
      onScoreUpdate(finalScore);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Card sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#FFFFFF !important',
              textShadow: `
                0 0 8px rgba(0, 0, 0, 0.9),
                0 0 15px #00F5FF,
                0 2px 4px rgba(0, 0, 0, 0.9)
              `,
              fontWeight: 700,
            }}
          >
            [ RETRO_RUNNER ]
          </Typography>
          <Box sx={{ fontFamily: 'monospace', display: 'flex', gap: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FFFFFF !important',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
                fontWeight: 600,
              }}
            >
              SCORE: <span style={{ 
                color: '#00F5FF',
                textShadow: `
                  0 0 8px rgba(0, 0, 0, 0.9),
                  0 0 10px #00F5FF
                `,
                fontWeight: 700,
              }}>{score}</span>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FFFFFF !important',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
                fontWeight: 600,
              }}
            >
              HIGH: <span style={{ 
                color: '#FF006E',
                textShadow: `
                  0 0 8px rgba(0, 0, 0, 0.9),
                  0 0 10px #FF006E
                `,
                fontWeight: 700,
              }}>{highScore}</span>
            </Typography>
          </Box>
        </Box>

        {/* Game Canvas */}
        <Box
          ref={gameRef}
          onClick={() => gameState === 'playing' && jump()}
          sx={{
            position: 'relative',
            width: '100%',
            height: '200px',
            background: `
              radial-gradient(ellipse at center top, rgba(255, 0, 110, 0.2) 0%, transparent 50%),
              linear-gradient(180deg, #0a0015 0%, #1a0033 100%)
            `,
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #FF006E, #00F5FF) 1',
            borderRadius: 1,
            overflow: 'hidden',
            cursor: gameState === 'playing' ? 'pointer' : 'default',
            boxShadow: `
              inset 0 0 30px rgba(255, 0, 110, 0.2),
              inset 0 0 60px rgba(0, 245, 255, 0.1),
              0 0 20px rgba(255, 0, 110, 0.3)
            `,
          }}
        >
          {/* Suelo con efecto neón */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #FF006E, #00F5FF, #FF006E)',
              boxShadow: '0 0 15px #00F5FF, 0 0 30px #FF006E',
            }}
          />

          {/* Player (Cubo cyberpunk) */}
          <Box
            sx={{
              position: 'absolute',
              bottom: `${playerY}px`,
              left: '15%',
              width: '30px',
              height: '30px',
              background: 'linear-gradient(135deg, #00F5FF 0%, #FF006E 100%)',
              border: '2px solid #00F5FF',
              boxShadow: `
                0 0 20px #00F5FF,
                0 0 40px rgba(0, 245, 255, 0.5),
                inset 0 0 10px rgba(255, 255, 255, 0.3)
              `,
              transition: 'bottom 0.1s ease-out',
              position: 'relative',
              
              // Efecto de pixeles/glitch
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 4,
                background: 'rgba(255, 0, 110, 0.3)',
              },
            }}
          />

          {/* Obstáculos cyberpunk */}
          {obstacles.map(obs => (
            <Box
              key={obs.id}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: `${obs.x}%`,
                width: '20px',
                height: '30px',
                background: 'linear-gradient(135deg, #FF006E 0%, #C70058 100%)',
                border: '2px solid #FF006E',
                boxShadow: `
                  0 0 20px #FF006E,
                  0 0 40px rgba(255, 0, 110, 0.5),
                  inset 0 0 10px rgba(255, 255, 255, 0.2)
                `,
                position: 'relative',
                
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 3,
                  background: 'rgba(0, 245, 255, 0.2)',
                },
              }}
            />
          ))}

          {/* Overlay de estado */}
          {gameState !== 'playing' && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(10, 10, 10, 0.85)',
                gap: 2,
              }}
            >
              {gameState === 'ready' && (
                <>
                  <Typography
                    variant="h5"
                    sx={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF', fontFamily: 'monospace' }}
                  >
                    &gt; PRESIONA ESPACIO O CLICK PARA SALTAR
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={startGame}
                    sx={{ mt: 2 }}
                  >
                    INICIAR JUEGO
                  </Button>
                </>
              )}
              
              {gameState === 'gameOver' && (
                <>
                  <Typography
                    variant="h4"
                    sx={{ color: '#FF00FF', textShadow: '0 0 10px #FF00FF', fontFamily: 'monospace' }}
                  >
                    // GAME_OVER
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#00FFFF', fontFamily: 'monospace' }}
                  >
                    SCORE: {score}
                  </Typography>
                  {score === highScore && score > 0 && (
                    <Typography
                      variant="body1"
                      sx={{ color: '#00FF88', textShadow: '0 0 10px #00FF88' }}
                    >
                      ¡NUEVO RÉCORD! 🎮
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    startIcon={<Replay />}
                    onClick={startGame}
                    sx={{ mt: 2 }}
                  >
                    REINTENTAR
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', color: '#666', mt: 2 }}
        >
          💡 Presiona ESPACIO o CLICK para saltar. Evita los obstáculos.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RetroGame;