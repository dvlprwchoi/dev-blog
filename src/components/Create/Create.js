function Create() {
  return (
    <div className="create main">
      <div className="create-title">
        <h2>Create a post</h2>
      </div>
      <div className="create-post-inputs">
        <form>
          <div className="input-title-div">
            <label htmlFor="title">Title: </label>
            <input
              className="post-title-input-box"
              type="text"
              name="title"
              placeholder="Add title..."
              required
            />
          </div>
          <div className="input-text-div">
            <label htmlFor="post">Post: </label>
            <textarea
              className="post-text-input-area"
              name="post"
              placeholder="Add post..."
              required
            ></textarea>
          </div>
          <div className="submit-button-div">
            <button className="submit-button button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
