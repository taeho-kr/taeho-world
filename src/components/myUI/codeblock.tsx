interface CodeBlockProps {
  code: string;
}

const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <pre className="">
      <code>{code}</code>
    </pre>
  );
};

export default CodeBlock;
