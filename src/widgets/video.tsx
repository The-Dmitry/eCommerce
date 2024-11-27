export default function Video({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
      className='aspect-video w-full'
    />
  );
}
