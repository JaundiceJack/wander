const About = () => {
  // Compose Classes
  const containerCs = " mx-5 shadow-xl border-l border-blue-200 " +
                      " bg-gradient-to-br from-blue-200 to-blue-300 " +
                      " p-5 flex flex-col sm:flex-row rounded-xl rounded-tl-lg ";
  const headerCs = " font-bold text-shadow text-yellow-500 leading-10 ";

  return (
    <main className="flex justify-center pt-44">
      <div className={containerCs}>
        <div id="intro" className="pr-4 mb-2 sm:mb-0 font-mont">
          <h1 className={headerCs}>Welcome to Wayfarer's Wander. Here you'll find my
          best shots of nature and humanity's history.</h1>
        </div>
      </div>
    </main>
  )
}

export default About;
