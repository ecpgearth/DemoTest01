import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import sharp from "sharp";

// Cloudinary config
cloudinary.config({
  cloud_name: "dp8rngvb7",
  api_key: "391778679854967",
  api_secret: "lF1ZD5D4Qa609GqS1ibVSinNyuc",
  secure: true,
});

export const POST = async (req) => {
  console.log("check cloudinary", cloudinary.config());
  const data = await req.formData();
  const image = await data.get("image");
  if (!image) {
    return NextResponse.json({ err: "No data uploaded" }, { status: 400 });
  }
  if (image.size > 10485760) {
    return NextResponse.json(
      {
        success: false,
        err: "Image size is larger than expected",
      },
      { status: 400 }
    );
  }
  console.log(image);
  const fileBuffer = await image.arrayBuffer();

  const fileName = image.name.toLowerCase();

  //  allowed image file extensions

  const allowedExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".bmp",
    ".webp",
    ".tiff",
    ".svg",
    ".heic",
  ];

  const isValidExtension = allowedExtensions.some((extension) =>
    fileName.endsWith(extension)
  );

  if (!isValidExtension) {
    return NextResponse.json({ err: "Invalid image format" }, { status: 400 });
  }

  try {
    //   await connectDB();
    const buffer = Buffer.from(fileBuffer);

    const pngBuffer = await sharp(buffer)
      .resize({ width: 96, height: 96 })
      .toFormat("png")
      .toBuffer();

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "testing",
              transformation: {
                format: "png",
              },
            },
            (error, result) => {
              if (error) {
                console.log("cloudiary", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(pngBuffer);
      });
    };

    const result = await uploadToCloudinary();
    // console.log("result of cloudinary", result);
    let imageUrl = result.secure_url;

    return NextResponse.json(
      { success: true, imageUrl: imageUrl },
      { status: 200 }
    );
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
};
