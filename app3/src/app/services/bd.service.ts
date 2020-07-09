import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';


export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}


@Injectable({
  providedIn: 'root'
})
export class BdService {

  public get mediaFolderPath(): string {
    return 'imagem';
  }


  constructor(
    private firebase: AngularFireDatabase,
    private fireStorage: AngularFireStorage
  ) { }

  public consultarPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // consultando as publicaçoes
      this.firebase.database.ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          // console.log(snapshot.val());

          const publicacoes: Array<any> = [];

          // loop
          snapshot.forEach((chieldSnapshot: any) => {

            const publicacao = chieldSnapshot.val();
            publicacao.key = chieldSnapshot.key;

            publicacoes.push(publicacao);

          });

          return publicacoes.reverse();

        })
        .then((publicacoes: any) => {


          publicacoes.forEach((publicacao: any) => {

            // consultando as imagens
            this.fireStorage.ref(`${this.mediaFolderPath}/${publicacao.key}`)
              .getDownloadURL()
              .subscribe((url: any) => {

                publicacao.url_imagem = url;

                // consultar dados de cadastro
                this.firebase.database.ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snap: any) => {
                    // console.log('-', snap.val().nomeUsuario);
                    publicacao.nome_usuario = snap.val().nomeUsuario;

                  });

              });

          });

          resolve(publicacoes);

        });

    });


  }

  public publicar(publicacao: any): any {

    return this.firebase.database.ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo });

  }

  public uploadFileAndGetMetadata(filePath: string, fileToUpload: File): FilesUploadMetadata {

    // const { name } = fileToUpload;
    // const mediaFolderPath$ = `${mediaFolderPath}/${new Date().getTime()}_${name}`;

    const uploadTask: AngularFireUploadTask = this.fireStorage.upload(filePath, fileToUpload);

    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(uploadTask, filePath),
    };

  }

  private getDownloadUrl$(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.fireStorage.ref(path).getDownloadURL())
    );
  }


}
