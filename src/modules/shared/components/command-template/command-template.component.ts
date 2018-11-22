import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommandCreator } from '@core/services/command-creator/command-creator';
import { CommandCreatorFactory } from '@core/services/command-creator/command-creator-factory.service';
import { Application } from '@shared/models/_index';

@Component({
    selector: 'hydro-command-template',
    templateUrl: './command-template.component.html',
    styleUrls: ['./command-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommandCreatorFactory],
})
export class CommandTemplateComponent implements OnChanges {
    @Input() application: Application;
    @Input() type: string;
    @Input() isValidInput: boolean = true;

    public codeExample: string;
    private commandCreator: CommandCreator;

    constructor(
        public commandCreatorFactory: CommandCreatorFactory
    ) {}

    public isGrpc(): boolean {
        return this.type === 'grpc';
    }

    ngOnChanges(simpleChanges: SimpleChanges): void {
        if (simpleChanges.type && simpleChanges.type.isFirstChange) {
            this.commandCreator = this.commandCreatorFactory.create(simpleChanges.type.currentValue);
        }

        if (simpleChanges.application) {
            this.codeExample = this.commandCreator.getCommand(simpleChanges.application.currentValue);
        }
    }
}
