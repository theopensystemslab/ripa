import { compose, lazy, mount, withView } from "navi";
import * as React from "react";
import { NotFoundBoundary, View } from "react-navi";

export type IContext = {
  navigation;
};

const renderNotFound: React.FC<any> = () => <h1>404 - Not Found</h1>;

export default compose(
  withView(
    <NotFoundBoundary render={renderNotFound}>
      <View />
    </NotFoundBoundary>
  ),

  mount({
    "/:teamId/:flowId": lazy(async req => {
      return import("./flow");
    })
  })
);
