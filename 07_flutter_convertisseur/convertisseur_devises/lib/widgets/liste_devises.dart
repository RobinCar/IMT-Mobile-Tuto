import 'package:convertisseur_devises/models/devise.dart';
import 'package:flutter/material.dart';

class ListeDevises extends StatelessWidget {
  const ListeDevises({
    Key key,
    @required Devise devise,
    @required this.onSelected,
  })  : _devise = devise,
        super(key: key);

  final Devise _devise;
  final Function onSelected;

  @override
  Widget build(BuildContext context) {
    return DropdownButton(
        isExpanded: true,
        onChanged: onSelected,
        value: _devise,
        items: [
          for (var devise in Devise.values)
            DropdownMenuItem<Devise>(
              child: Text(devise.libelle),
              value: devise,
            ),
        ]);
  }
}
