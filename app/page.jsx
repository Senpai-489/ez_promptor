import Feed from "@components/Feed"

const Home = () => {
    return (
      <section className='w-full flex-center flex-col'>
      
        <h1 className='head_text text-center'>Share your Discoveries
        <br/>
        <span className="orange_gradient text-center">AI Prompts</span>
        </h1>
        <p className="desc text-center"> <strong>EZ Promptor</strong> is an open source AI-Prompt tool for folks to discover, create and share cool and creative AI prompts</p>
        <Feed/>
      </section>
    )
  }
  
  export default Home
  