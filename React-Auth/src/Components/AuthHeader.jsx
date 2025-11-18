import { Box, Typography } from '@mui/material';

function AuthHeader({ icon: Icon, title, subtitle, iconColor = '#00FFFF' }) {
  return (
    <>
      <Icon
        sx={{
          fontSize: 60,
          color: iconColor,
          mb: 2,
          filter: `drop-shadow(0 0 10px ${iconColor})`,
        }}
      />

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: iconColor, textShadow: `0 0 10px ${iconColor}` }}
      >
        {title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, color: subtitle.color || '#8A2BE2' }}>
        {subtitle.text}
      </Typography>
    </>
  );
}

export default AuthHeader;