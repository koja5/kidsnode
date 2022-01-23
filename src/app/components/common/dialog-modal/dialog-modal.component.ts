import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
})
export class DialogModalComponent implements OnInit {
  @ViewChild('ejDialog') ejDialog!: DialogComponent;
  @Input() show!: boolean;
  @Output() closeEventEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.returnWidth(window.innerWidth);
    setTimeout(() => {
      this.ejDialog.show();
    }, 50);
  }

  onResize(event: any) {
    this.returnWidth(event.target.innerWidth);
  }

  closeModal() {
    this.closeEventEmitter.emit();
  }

  returnWidth(innerWidth: any) {
    if (innerWidth > 992) {
      return 35;
    } else {
      return 100;
    }
  }
}
