import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({ updateFilter }) => (
    <View style={styles.menu}>
        <OptionMenu updateFilter={() => updateFilter('All')} nom="Toutes" />
        <OptionMenu updateFilter={() => updateFilter('NotTerminated')} nom="Actives" />
        <OptionMenu updateFilter={() => updateFilter('Terminated')} nom="Terminées" />
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu