import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { SharedModule } from '@shared/shared.module';
import { MockModel1, MockModel2 } from '@testing/factories/model';

fdescribe('filter component', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        component.data = [MockModel1, MockModel2];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('contains input control', () => {
        expect(component.filterControl).toBeDefined();
    });

    describe('with default filter by name', () => {
        describe('empty input', () => {
            it('emit same list', (done: DoneFn) => {
                const { filterControl } = component;

                component.filterEvent.subscribe(_ => {
                    expect(_).toEqual([MockModel1, MockModel2]);
                    done();
                });

                filterControl.setValue('');

                fixture.detectChanges();
            });
        });

        describe('input with first models name', () => {
            it('emit same list', (done: DoneFn) => {
                const { filterControl } = component;

                component.filterEvent.subscribe(_ => {
                    expect(_).toEqual([MockModel1]);
                    done();
                });

                filterControl.setValue(MockModel1.name);

                fixture.detectChanges();
            });
        });

        describe('input with wrong models name', () => {
            it('emit same list', (done: DoneFn) => {
                const { filterControl } = component;

                component.filterEvent.subscribe(_ => {
                    expect(_).toEqual([]);
                    done();
                });

                filterControl.setValue('wrong model name');

                fixture.detectChanges();
            });
        });
    });

    describe('with custom filter prop attribute: id', () => {
        beforeEach(() => {
            component.filterProp = 'id';
        });

        describe('empty input', () => {
            it('emit same list', (done: DoneFn) => {
                const { filterControl } = component;

                component.filterEvent.subscribe(_ => {
                    expect(_).toEqual([MockModel1, MockModel2]);
                    done();
                });

                filterControl.setValue('');

                fixture.detectChanges();
            });
        });

        describe('input with first models id', () => {
            it('emit same list', (done: DoneFn) => {
                const { filterControl } = component;

                component.filterEvent.subscribe(_ => {
                    expect(_).toEqual([MockModel1]);
                    done();
                });

                filterControl.setValue(MockModel1.id);

                fixture.detectChanges();
            });
        });

        describe('input with wrong models id', () => {
            it('emit same list', (done: DoneFn) => {
                const { filterControl } = component;

                component.filterEvent.subscribe(_ => {
                    expect(_).toEqual([]);
                    done();
                });

                filterControl.setValue(72);

                fixture.detectChanges();
            });
        });
    });

});
