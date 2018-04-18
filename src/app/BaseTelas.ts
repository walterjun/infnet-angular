import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

export abstract class BaseTelas {
    windowsExcluir: any;
    type: string;
    mensagem: string;
    closeResult: string;
    windowsEdicao: any;
    tituloModal: string;
    modalIncluir: any;
    @Input() modalEdicao: any;
    @Input() modalDeletar: any;

    constructor(private modalService: NgbModal){}

    abrirModalEditar(itemModal: any, content) {
        this.modalEdicao = itemModal;
        this.tituloModal = 'Editar';
        this.windowsEdicao = this.modalService.open(content);
        this.windowsEdicao.result.then((result) => {
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      abrirModalExcluir(itemModal: any, content) {
        this.modalEdicao = itemModal;
        this.windowsExcluir = this.modalService.open(content);
        this.windowsExcluir.result.then((result) => {
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    abrirModalIncluir(content) {
        this.modalEdicao = this.modalIncluir;
        this.tituloModal = 'Incluir';
        this.windowsEdicao = this.modalService.open(content);
        this.windowsEdicao.result.then((result) => {
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

      public closeAlert() {
        this.mensagem = '';
        this.type = '';
    }
}