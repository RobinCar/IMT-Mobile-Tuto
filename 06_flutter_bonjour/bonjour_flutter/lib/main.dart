import 'package:flutter/material.dart';

void main() => runApp(MonApplication());

const PrimaryColor = const Color(0xFFB74093);

class MonApplication extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(
              backgroundColor: PrimaryColor,
              title: Text('Bonjour App'),
            ),
            body: SingleChildScrollView(
              child: Center(
                  child: Container(
                      height: 550,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Bonjour',
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 40,
                                color: PrimaryColor),
                          ),
                          Text('Je suis Robin',
                              style:
                                  TextStyle(color: PrimaryColor, fontSize: 25)),
                          Image.network(
                            'https://picsum.photos/250?image=9',
                            height: 350,
                          ),
                          BoutonContactezMoi(),
                        ],
                      ))),
            )));
  }
}

class BoutonContactezMoi extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO code du bouton "Contactez-moi" à compléter
    return RaisedButton(
      onPressed: () => {
        showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Contactez-moi'),
                content: Text('Je suis joignable à l\'IMT Atlantique'),
              );
            })
      },
      child: Text('Contactez-moi !',
          style: TextStyle(fontSize: 15, color: Colors.white)),
      color: PrimaryColor,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
    );
  }
}
