
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  [x: string]: unknown
}

const Button = ({ children, className = '', ...rest }: ButtonProps) => {
  return <button className={` text-xl font-medium ml-auto mr-2 mb-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 ${className}`} {...rest}>{children}</button>
}

export default Button