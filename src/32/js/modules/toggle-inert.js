export const toggleInertAttribute = (targets, boolean) => {
  targets.forEach((target) => {
    target.inert = boolean;
  });
};
