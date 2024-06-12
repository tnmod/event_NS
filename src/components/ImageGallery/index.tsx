import {useEffect, useState} from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { images, CustomImage } from "./images";

export const ImageGallery = () => {
	const [index, setIndex] = useState(-1);
	
	const currentImage = images[index];
	const nextIndex = (index + 1) % images.length;
	const nextImage = images[nextIndex] || currentImage;
	const prevIndex = (index + images.length - 1) % images.length;
	const prevImage = images[prevIndex] || currentImage;
	const [imagesRender,setImages] = useState<any>([])
	
	useEffect(() => {
		setImages(images.sort(() => Math.random() - 0.5))
	}, []);
	
	const handleClick = (index: number, item: CustomImage) => setIndex(index);
	const handleClose = () => setIndex(-1);
	const handleMovePrev = () => setIndex(prevIndex);
	const handleMoveNext = () => setIndex(nextIndex);
	
	
	
	return (
		<div id={'gallery'} style={{marginBottom:"50px"}}>
			<Gallery
				images={imagesRender}
				onClick={handleClick}
				enableImageSelection={false}
			/>
			{!!currentImage && (
				/* @ts-ignore */
				<Lightbox
					mainSrc={currentImage.original}
					imageTitle={currentImage.caption}
					mainSrcThumbnail={currentImage.src}
					nextSrc={nextImage.original}
					nextSrcThumbnail={nextImage.src}
					prevSrc={prevImage.original}
					prevSrcThumbnail={prevImage.src}
					onCloseRequest={handleClose}
					onMovePrevRequest={handleMovePrev}
					onMoveNextRequest={handleMoveNext}
				/>
			)}
		</div>
	);
}