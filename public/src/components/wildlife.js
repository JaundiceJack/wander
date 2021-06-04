

const Wildlife = () => {
  // Compose Classes
  const containerCs = "mx-5 shadow-xl border-l border-blue-200 \
    bg-gradient-to-br from-blue-200 to-transparent \
    p-5 flex flex-col sm:flex-row rounded-xl rounded-tl-lg"
  const headerCs = "font-bold text-shadow text-yellow-500 leading-10"
  const dividerCs = "h-px w-full sm:w-px sm:h-32 mb-1 sm:mb-0 \
    bg-gradient-to-r sm:bg-gradient-to-b \
    from-transparent via-yellow-600 to-transparent"
  const linkCs = "text-shadow text-xl text-yellow-400 font-semibold \
    transform duration-75 hover:scale-105";

  return (
    <main class="flex justify-center pt-44">
      <div className={containerCs}>
        <div id="intro" class="pr-4 mb-2 sm:mb-0 font-mont">
          <h1 className={headerCs}>Coming Soon!</h1>
        </div>
      </div>
    </main>
  )
}

export default Wildlife;
