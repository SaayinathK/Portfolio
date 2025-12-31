// Usage Example for Cloudinary Images
// After uploading, you get a secure_url from Cloudinary (e.g., result.secure_url)
// You can use it directly in your app:
//
// <img src={imageUrl} alt="Uploaded" width={300} />
//
// Or use Cloudinary transformations:
// <img src={`https://res.cloudinary.com/<cloud_name>/image/upload/w_300,h_300,c_fill/${publicId}`} />
//
// Optional: Cloudinary Upload Widget
// npm install @cloudinary/react @cloudinary/url-gen
//
// import { Cloudinary } from "@cloudinary/url-gen";
// const cld = new Cloudinary({ cloud: { cloudName: 'your_cloud_name' } });
//
// See Cloudinary docs for more widget usage details.
