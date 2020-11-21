export class Tache {

  constructor(
    public id: number,
    public nom: string,
    public duree: number,
    public date_active: string,
    public status: string,
    public importance: string,
    public categorie: string,
    public notes: string[]
  ) { }
}
