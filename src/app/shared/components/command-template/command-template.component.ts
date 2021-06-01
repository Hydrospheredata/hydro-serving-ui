import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommandCreator } from '@app/core/command-creator';
import { CommandCreatorFactory } from '@app/core/command-creator-factory.service';
import { Application } from '@app/core/data/types';

@Component({
  selector: 'hs-command-template',
  templateUrl: './command-template.component.html',
  styleUrls: ['./command-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommandCreatorFactory],
})
export class CommandTemplateComponent implements OnChanges {
  @Input() application: Application;
  @Input() type: string;
  @Input() isValidInput: boolean = true;
  @Input() input: string;

  public codeExample: string;
  private commandCreator: CommandCreator;

  constructor(public commandCreatorFactory: CommandCreatorFactory) {}

  public isGrpc(): boolean {
    return this.type === 'grpc';
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.type && simpleChanges.type.isFirstChange) {
      this.commandCreator = this.commandCreatorFactory.create(
        simpleChanges.type.currentValue
      );
    }

    if (simpleChanges.input) {
      this.codeExample = this.commandCreator.getCommand(
        this.application,
        (simpleChanges.input && simpleChanges.input.currentValue) || ''
      );
    }
  }
}
