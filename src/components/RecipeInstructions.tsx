interface RecipeInstructionsProps {
  instructions: string[];
}

// create recipes instruction component (https://chatgpt.com/c/67ffe0ba-1d38-8005-91f3-390378d3ce7e)
const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ instructions }) => {
  return (
    // create a numbered list
    <ol className="list-decimal list-inside">
      {instructions.map((step, index) => (
        <li key={index} className="mb-2">{step}</li>
      ))}
    </ol>
  );
};

export default RecipeInstructions;
