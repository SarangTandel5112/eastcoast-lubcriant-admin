import { Button } from '@/modules/common';

export const PageHeader = (props: {
  title: string;
  description: string;
  actionLabel?: string;
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-neutral-100">{props.title}</h2>
        <p className="text-sm text-neutral-400">{props.description}</p>
      </div>
      {props.actionLabel
        ? (
            <Button variant="outline">{props.actionLabel}</Button>
          )
        : null}
    </div>
  );
};
