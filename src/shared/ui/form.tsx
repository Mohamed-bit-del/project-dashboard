export const FormLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block font-medium mb-1">
    {children}
  </label>
);

export const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="w-full p-2 border border-gray-300 rounded-md" {...props} />
);
