
type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
  [x: string]: unknown;
}

const IconButton = ({ children, className, ...rest }: IconButtonProps) => (
  <button {...rest} type="button" className={`flex items-center p-1 mr-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${className ? className : ''}`}>
    {children}
  </button>
)

export default IconButton