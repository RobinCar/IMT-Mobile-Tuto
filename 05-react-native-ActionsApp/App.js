import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        filtre: 'All'
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie)
        this.setState({ texteSaisie: nouvelleSaisie })
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider ! : ' + this.state.texteSaisie)
        this.setState({ actions: this.state.actions.concat({ title: this.state.texteSaisie, isTerminated: false }) })
    }

    updateTerminated = (index) => {
        console.log(index);
        if (this.state.actions[index].isTerminated) {
            console.log("Set not termined : " + this.state.actions[index].title);
            this.state.actions[index].isTerminated = false;
        } else {
            console.log("Set termined : " + this.state.actions[index].title);
            this.state.actions[index].isTerminated = true;
        }
        this.setState(this.state.actions);
    }

    deleteAction = (index) => {
        console.log("Delete action : " + this.state.actions[index].title);
        this.state.actions.splice(index, 1);
        this.setState(this.state.actions);
    }

    updateFilter = (newFilter) => {
        this.setState({ filtre: newFilter });
    }

    render() {
        const { texteSaisie } = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete />
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)} />
                    <ListeActions filtre={this.state.filtre} updateTerminated={this.updateTerminated} deleteAction={this.deleteAction} actions={this.state.actions} />
                    <BoutonCreer onValider={(titre) => this.validerNouvelleAction(titre)} />
                </ScrollView>
                <Menu updateFilter={this.updateFilter} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})