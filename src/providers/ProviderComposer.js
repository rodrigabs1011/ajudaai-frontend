
import React from "react";
import GlobalProvider from './GlobalProvider';


function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function MasterProvider({ children }) {
  return (
    <ProviderComposer
      contexts={[<GlobalProvider />]}
    >
      {children}
    </ProviderComposer>
  );
}

export default MasterProvider;
