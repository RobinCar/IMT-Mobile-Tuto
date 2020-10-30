enum Devise { EURO, DOLLAR, LIVRE_STERLING }
// taux de change
// les poids notés sont fonctions de l'euro. 1 € = 1.16729 $ = 0.902694 £
Map<Devise, double> taux = {
  Devise.EURO: 1,
  Devise.DOLLAR: 1.16729,
  Devise.LIVRE_STERLING: 0.902694
};
// libellés utilisés lors de l'affichage
Map<Devise, String> libelles = {
  Devise.EURO: 'Euro',
  Devise.DOLLAR: 'Dollar',
  Devise.LIVRE_STERLING: 'Livre Sterling'
};

// Cette extension permet de disposer d'une propriété "libelle" pour l'énumération Devise.
// Exemple d'utilisation : Devise.EURO.libelle
extension DeviseExtension on Devise {
  String get libelle {
    return libelles[this];
  }

  double get change {
    return taux[this];
  }
}
