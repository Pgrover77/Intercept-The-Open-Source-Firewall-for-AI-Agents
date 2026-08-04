import { PNG } from "pngjs";
import * as fs from "fs"
import pixelmatch from "pixelmatch";

export interface DifferenceResult  {    
    diffPixelCounter:number;
    totalPixels: number;
    diffPercentage:number;      // differnt pixels/total *100
    diffImagePath:string;       // path to the difference Image

}

export function compareScreenshots(
    imagePathA:string,
    imagePathB:string,
    differenceOutputPath:string
):DifferenceResult {
    const imageA = PNG.sync.read(fs.readFileSync(imagePathA))
    const imageB = PNG.sync.read(fs.readFileSync(imagePathB))

    const {width,height} = imageA       // we will only consider the measures of image A because the height and all will be the same for both the images

    const difference = new PNG ({width,height});   // pixelmatch will write the visually different image here

    const diffPixelCounter = pixelmatch(
        imageA.data,
        imageB.data,
        difference.data,
        width,
        height,
        {threshold:0.1} //lower the sensitivity lower 

    )

    fs.writeFileSync(differenceOutputPath,PNG.sync.write(difference))

    const totalPixels = width*height;
    const diffPercentage = (diffPixelCounter / totalPixels) * 100;

    return{
        diffPixelCounter,
        totalPixels,
        diffPercentage,
        diffImagePath:differenceOutputPath
       
    }




 }