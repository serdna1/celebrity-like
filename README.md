# Celebrity Like

In this React app you upload an image with celebrities in it and the app recognizes them if any

![app screenshot (testing a Donald Trump photo)](https://res.cloudinary.com/leprechaunotd/image/upload/v1678138957/Screenshot_157_iawnt6.png)

## Features
- Name of the celebrity (overlayed over the response image)
- Emotion of the celebrity (one of eight) via a overlayed emoji
- Croped face and rescaling
- Image optimization: Format conversion (all images are converted to .webp) and quality set to 'auto low'
- Occupation of the celebrity (actor, singer) making use of a celebrity api searh endpoit ('api ninja')
- Múltiple celebrity detection in a single image
- Link to a personal wiki page of the celebrity
- A dropzone which provides a way to work with the response once this arrives to the client.

## Cloudinary Use
The cloudinary celebrity recognition add on provided not only the name of the individual but the bounding box delimiting his face and the emotion. Apart from the add on, a cloudinary SDK is always used to make various transformations (crop, resize, format converter, quality tunner, text overlay, image overlay and thumbnail creator focusing on faces). The image uploading was performed with a fetch passing a formData with the required params. It is worth noting that the add on data were not provided in the SDK, but that they have to be accesed via the response passing an add on related param to the request and sign this (it was made via a dependency called rusha). Cloudinary was also used as a data base for some static images (emojis and the images used for the samples).

## Installation
`pnpm install`

## Website URL
https://celebrity-like.vercel.app/
