  import { createCanvas, loadImage, registerFont } from 'canvas';

  registerFont('./assets/fonts/Lexend-Bold.ttf', { family: 'Lexend' });

  import * as fs from 'fs';
  import * as path from 'path';

  export interface UserProfile {
    name: string;
    // Add other profile properties as needed
  }

  export interface WallpaperConfig {
    width: number;
    height: number;
    backgroundImagePath: string;
    outputPath: string;
    text: {
      main: string;
      username: string;
      font: string;
      size: number;
      color: string;
      position: {
        x: number;
        y: number;
      };
    };
  }

  export class WallpaperGenerator {
    private config: WallpaperConfig;

    constructor(config: WallpaperConfig) {
      this.config = config;
    }

          async generateWallpaper(userProfile: UserProfile): Promise<string> {
      try {
          // Load the background image first to get its dimensions
          const backgroundImage = await loadImage(this.config.backgroundImagePath);

          // Create canvas with the same size as the image
          const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
          const ctx = canvas.getContext('2d');

          // Draw the background image at (0, 0) with its original size
          ctx.drawImage(backgroundImage, 0, 0);

          // Set bold, white text
          // ctx.font = `bold ${this.config.text.size}px ${this.config.text.font}`;
          ctx.font = `bold 80px Lexend`;
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Optional: Add text shadow for visibility
          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          // Draw main text and username, both centered on the image
          const centerX = backgroundImage.width / 2;
          const centerY = backgroundImage.height / 2;

          const mainText = this.config.text.main;
          ctx.fillText(mainText, centerX, centerY);

          const usernameText = this.config.text.username.replace('{username}', userProfile.name);
          ctx.fillText(usernameText, centerX, centerY - 80);

          // Save as before
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const outputFileName = `wallpaper_${userProfile.name}_${timestamp}.png`;
          const outputPath = path.join(this.config.outputPath, outputFileName);
          const buffer = canvas.toBuffer('image/png');
          fs.writeFileSync(outputPath, buffer);

          console.log(`Wallpaper generated successfully: ${outputPath}`);
          return outputPath;
      } catch (error) {
          console.error('Error generating wallpaper:', error);
          throw error;
      }
      }
      

  }