export const PipitLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M10 8V16H12.5C14.433 16 16 14.433 16 12.5C16 10.567 14.433 9 12.5 9H10V8ZM12.5 11H12V14H12.5C13.3284 14 14 13.3284 14 12.5C14 11.6716 13.3284 11 12.5 11Z"
      fill="white"
    />
  </svg>
);

export const AssistantIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 13.2393 8.01429 14.3644 8.84196 15.158"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
