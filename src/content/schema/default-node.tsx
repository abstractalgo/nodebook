import { NodeType } from "nodebook";
import { FC, ReactNode } from "react";
import { ExternalUrl } from "src/common/types";

export type DefaultNode = NodeType<
  "default",
  {
    title: string;
    content: ReactNode;
    references?: (
      | ExternalUrl
      | {
          href: ExternalUrl;
          title: ReactNode;
        }
    )[];
  }
>;

export const DefaultNodeComp: FC<DefaultNode> = ({
  title,
  content,
  references,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">{title}</div>
      {references && (
        <div className="flex flex-col gap-1">
          {references.map((ref) => {
            if (typeof ref === "string") {
              return (
                <a href={ref} key={ref}>
                  {ref}
                </a>
              );
            }
            return (
              <a href={ref.href} key={ref.href}>
                {ref.title}
              </a>
            );
          })}
        </div>
      )}
      <div>{content}</div>
    </div>
  );
};
