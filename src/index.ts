import { WallpaperGenerator, UserProfile, WallpaperConfig } from './wallpaperGenerator';
import * as path from 'path';
import * as fs from 'fs';

const outputDir = './output';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
} else {
  // Remove all files in the output directory
  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    const filePath = path.join(outputDir, file);
    if (fs.lstatSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    } else {
      // If subdirectories exist, recursively remove them (optional)
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  }
}

const config: WallpaperConfig = {
  width: 1920,
  height: 1080,
  backgroundImagePath: './assets/background.png', // Make sure this exists
  outputPath: outputDir,
  text: {
    main: "",
    username: "don't\nsmoke\ntoday,\n{username}",
    font: "Lexend",
    size: 80,
    color: "#FFFFFF",
    position: {
      x: 960,
      y: 540
    }
  }
};

const userProfiles: UserProfile[] = [
  { name: "Thatcher" },
  { name: "Devansh" },
  { name: "asher" }
];

async function generateWallpapers() {
  const generator = new WallpaperGenerator(config);
  for (const profile of userProfiles) {
    try {
      await generator.generateWallpaper(profile);
    } catch (error) {
      console.error(`Failed to generate wallpaper for ${profile.name}:`, error);
    }
  }
}

generateWallpapers().then(() => {
  console.log('All wallpapers generated successfully!');
}).catch((error) => {
  console.error('Error in wallpaper generation process:', error);
});
