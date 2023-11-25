import { A } from '@solidjs/router';
import './App.css';

import { Route, Routes } from '@solidjs/router';
import { IndexPage } from './pages';
import { BouncerPage } from './pages/bouncer';
import { EntrantPage } from './pages/entrant';

function App() {
  return (
    <>
      <div class="space-y-4 pb-10">
        <span class="pr-4">
          <A
            class="bg-purple-600 text-white text-center py-4 rounded-lg w-64"
            href="/"
          >
            HOME
          </A>
        </span>
        <span class="pr-4">
          <A
            class="bg-purple-600 text-white text-center py-4 rounded-lg w-64"
            href="/bouncer"
          >
            BOUNCER
          </A>
        </span>
        <span>
          <A
            class="bg-purple-600 text-white text-center py-4 rounded-lg w-64"
            href="/entrant"
          >
            ENTRANT
          </A>
        </span>
      </div>
      <Routes>
        <Route path="/" component={IndexPage} />
        <Route path="/bouncer" component={BouncerPage} />
        <Route path="/entrant" component={EntrantPage} />
      </Routes>
    </>
  );
}

export default App;
