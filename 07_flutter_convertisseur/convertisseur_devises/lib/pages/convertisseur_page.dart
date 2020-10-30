import 'package:convertisseur_devises/models/devise.dart';
import 'package:convertisseur_devises/styles.dart';
import 'package:convertisseur_devises/widgets/liste_devises.dart';
import 'package:convertisseur_devises/widgets/saisie_nombre.dart';
import 'package:flutter/material.dart';

class ConvertisseurDevisePage extends StatefulWidget {
  ConvertisseurDevisePage();
  @override
  State<StatefulWidget> createState() {
    return _ConvertisseurDevisePage();
  }
}

class _ConvertisseurDevisePage extends State<ConvertisseurDevisePage> {
  // les différents "états" de la page
  double _valeur; // valeur saisie
  Devise _deviseInitial; // devise initiale sélectionnée
  Devise _deviseFinale; // devise finale sélectionnée
  double _resultat; // le résultat de la conversion
  // définition des valeurs initiales
  @override
  void initState() {
    super.initState();
    _valeur = 0;
    _resultat = 0;
    _deviseInitial = Devise.EURO;
    _deviseFinale = Devise.DOLLAR;
  }

  void _onValEdited(String saisie) {
    setState(() {
      _valeur = double.parse(saisie);
    });
  }

  void _onInitialDeviseChanges(Devise devise) {
    setState(() {
      _deviseInitial = devise;
    });
  }

  void _onFinalDeviseChanges(Devise devise) {
    setState(() {
      _deviseFinale = devise;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      children: [
        Spacer(),
        Text(
          'Valeur',
          style: AppStyle.labelStyle,
        ),
        Spacer(),
        SaisieNombre(onValEdited: _onValEdited),
        Spacer(),
        Text(
          'De',
          style: AppStyle.labelStyle,
        ),
        Spacer(),
        ListeDevises(
            devise: _deviseInitial, onSelected: _onInitialDeviseChanges),
        Spacer(),
        Text('Vers', style: AppStyle.labelStyle),
        Spacer(),
        ListeDevises(devise: _deviseFinale, onSelected: _onFinalDeviseChanges),
        Spacer(
          flex: 2,
        ),
        ElevatedButton(
            onPressed: () => {
                  setState(() {
                    _resultat =
                        _valeur * _deviseFinale.change / _deviseInitial.change;
                  })
                },
            child: Text('Convertir')),
        Spacer(
          flex: 2,
        ),
        Text(_resultat.toString(), style: AppStyle.labelStyle),
        Spacer(),
      ],
    ));
  }
}
