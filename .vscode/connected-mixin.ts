import { Constructor, CustomElement } from "@kibo-types/utility";

type StateSelector = (state: Object) => any;
type StateMap = { [key: string]: StateSelector };

interface FetchError {
  message: string;
  stack?: string;
  info?: object;
}
interface Subscription {
  closed: boolean;
  unsubscribe(): void;
}
interface ConnectedElement {
  showOffline: boolean;
  loading: boolean;
  errors: FetchError[];
  subscription: Subscription;
}

// interface Observable {
//   subscribe(observer): Subscription;
// }

const placeholderSubscription = { closed: true, unsubscribe: () => {} };

interface Observerable {
  subscribe(subscriber): Subscription;
}

interface withConnectOptions {
  observable: Observerable;
  getInitialState: () => Object;
  stateMap: StateMap;
}

export const withConnection = (options: withConnectOptions) => <
  T extends Constructor<CustomElement>
>(
  baseElement: T
) => {
  const {
    observable = {
      subscribe() {
        return placeholderSubscription;
      }
    },
    getInitialState = () => ({}),
    stateMap = {}
  } = options || {};
  return class extends baseElement implements CustomElement, ConnectedElement {
    loading = false;
    errors = [];
    showOffline = true;
    subscription = placeholderSubscription;
    observer = (state: object) => {
      this.mapState(state);
    };
    mapState(state: Object) {
      for (let key in stateMap) {
        this[key] = stateMap[key](state);
      }
    }
    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      this.subscription = observable.subscribe(this.observer.bind(this));
      this.mapState(getInitialState());
    }
    disconnectedCallback() {
      this.subscription.unsubscribe();
      if (super.disconnectedCallback) super.disconnectedCallback();
    }
  };
};
