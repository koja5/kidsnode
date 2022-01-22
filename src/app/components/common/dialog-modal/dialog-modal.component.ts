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
    setTimeout(() => {
      this.ejDialog.show();
    }, 50);
  }

  closeModal() {
    this.closeEventEmitter.emit();
  }
}
