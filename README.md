# Birthday Wishes Website

A beautiful and interactive birthday website that allows visitors to send wishes and view a countdown to the special day.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, and mobile)
- **Countdown Timer**: Shows days, hours, minutes, and seconds until the birthday
- **Image Carousel**: Displays 5 images in a loop with navigation controls
- **Birthday Wishes**: Visitors can submit wishes that are stored locally
- **Birthday Animation**: Special effects and music when the countdown reaches zero
- **Modern UI**: Clean and attractive design with smooth animations

## Setup Instructions

1. Clone or download this repository
2. Create an `images` folder and add your images:
   - Name them `image1.jpg`, `image2.jpg`, etc. (up to `image5.jpg`)
   - Recommended image size: 800x400 pixels
3. Add a birthday music file:
   - Name it `birthday-music.mp3`
   - Place it in the root directory
4. Open `script.js` and update the birthday date:
   ```javascript
   const birthdayDate = new Date(2024, 11, 25, 0, 0, 0); // December 25, 2024
   ```
5. Open `index.html` in a web browser to view the website

## Customization

### Changing Colors
The main color scheme can be modified in `styles.css`:
- Primary color: `#ff6b6b`
- Secondary color: `#ffd93d`
- Background colors and gradients can be adjusted in the respective sections

### Modifying Content
- Update the About section text in `index.html`
- Change the navigation links in the navbar
- Modify the footer content and social media links

### Adding More Images
To add more images to the carousel:
1. Add more image files to the `images` folder
2. Add corresponding `<div class="carousel-item">` elements in `index.html`

## Browser Support
The website works best in modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Local Storage
Birthday wishes are stored in the browser's local storage. They will persist even after the browser is closed, but will be cleared if the user clears their browser data.

## License
This project is open source and available under the MIT License. 