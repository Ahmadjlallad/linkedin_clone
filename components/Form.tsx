import React from "react";

type Props = {};

function Form({}: Props) {
  const [input, setInput] = React.useState("");
  const [photoInput, setPhotoInput] = React.useState("");
  const upLoadPost = () => {};
  return (
    <form
      className="flex flex-col relative space-y-2 text-black/75 dark:text-white/75"
      onSubmit={upLoadPost}
    >
      <textarea
        rows={4}
        placeholder="what in your mind"
        className="bg-transparent outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        placeholder="add a photo url"
        type={"text"}
        value={photoInput}
        onChange={(e) => setPhotoInput(e.target.value)}
        className="bg-transparent outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
      />
      <button
        className="absolute bottom-0 right-0 font-medium
      bg-blue-400 hover:bg-blue-500 disabled:text-black/40 
      bg-white/75 disabled:cursor-not-allowed
      text-white rounded-full px-3.5 py-1
      "
        disabled={!input.trim() && !photoInput.trim()}
        type="submit"
      >
        POST
      </button>
    </form>
  );
}

export default Form;
