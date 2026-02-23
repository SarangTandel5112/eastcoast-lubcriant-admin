export const PageContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-8">
      {props.children}
    </div>
  );
};
