import { Component } from "react";
import { ContactPage } from "./pages/ContactPage";
import { ContactDetails } from './pages/ContactDetails';
import { StatisticPage } from './pages/StatisticPage';
import { AppHeader } from './cmps/AppHeader';
import { Home } from "./pages/Home";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { EditContact } from "./pages/EditContact";
import { Singup } from "./pages/Singup";
export class App extends Component {
   render() {
      return (
         <section>
            <Router>
               <AppHeader />
               <main className="bitcoin-app">
                  <Switch>
                     <Route path="/contact/edit/:id?" component={EditContact} />
                     <Route path="/contact/:id" component={ContactDetails} />
                     <Route path="/contact" component={ContactPage} />
                     <Route path="/statistic" component={StatisticPage} />
                     <Route path="/singup" component={Singup} />
                     <Route path="/" component={Home} />
                  </Switch>
               </main>
            </Router>

         </section>
      );
   }
}
