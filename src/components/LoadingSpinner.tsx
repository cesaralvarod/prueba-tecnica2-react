export default function LoadingSpinner() {
  return (
    <div className="w-screen h-screen fixed inset-0 bg-black/30 z-20 flex items-center justify-center overflow-hidden">
      <div className="container-spinner">
        <div className="loading-spinner">
          <div id="square1"></div>
          <div id="square2"></div>
          <div id="square3"></div>
          <div id="square4"></div>
          <div id="square5"></div>
        </div>
      </div>
    </div>
  )
}
