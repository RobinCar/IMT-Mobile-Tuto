import 'package:convertisseur_devises/styles.dart';
import 'package:flutter/material.dart';

class SaisieNombre extends StatelessWidget {
  final Function onValEdited;

  const SaisieNombre({Key key, @required this.onValEdited}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(style: AppStyle.inputStyle, onChanged: onValEdited);
  }
}
