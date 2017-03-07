import React from 'react';

export class Content extends React.Component {
    constructor(props) {
        super(props);

        // Initialize component's states
        this.state = {
            showTab1: true,
            showTab2: false,
            value_slider: 50 // default for range element is average of min (1) and max (100)
        }


        this.handleChange = this.handleChange.bind(this);
        this.setMaxDate = this.setMaxDate.bind(this);
    }

    onTabChange(e) {
        // Add code to check for form values. 
        // Dont go the Report tab untill all fields filled and validated
        if (e.target.name === "tab1") {
            this.setState({
                showTab1: true,
                showTab2: false
            })
        }
        else {
            this.renderReport(e);

            // Check first_name and last name for alphabetic characters only

            // Check if start date and end dates are set

        }
    }

    renderReport(e) {
        e.preventDefault();
        this.setTransform();
        let errors = "";

        // Alphabet only regex
        let regex = /^[A-Z]+$/i;
        if (this.state.first_name === undefined
            || this.state.last_name === undefined
            || this.state.value_slider === undefined
            || this.state.start_date === undefined
            || this.state.end_date === undefined) {
            errors += "Please fill all the fields\n";
            //e.stopPropagation();
        }

        if (errors === "" && !!this.state.first_name.match(regex)
            && !!this.state.last_name.match(regex)) {
            this.setState({
                showTab1: false,
                showTab2: true
            });
        } else {
            errors += "Only alphabets are allowed in First Name and Last Name\n";
            alert(errors);
            return 0;
        }
    }

    setMaxDate(e) {
        this.setState({
            maxDate: e.target.value
        });
    }

    // 



    setTransform() {
        // This is a hack as there was no other way to update the pseudo elements programmatically
        let val = this.state.value_slider;

        let sheets = document.styleSheets;
        let selector_ring_left = ".ring-left::before";
        let selector_ring_right = ".ring-right::before";
        let replacementContent_ring_left, replacementContent_ring_right;

        // Integer to Rad conversion
        if (val < 50) {
            replacementContent_ring_left = 'rotate(0deg)';
            replacementContent_ring_right = 'rotate(' + 360 * (val / 100) + 'deg)';
        } else {
            replacementContent_ring_right = 'rotate(180deg)';
            replacementContent_ring_left = 'rotate(' + 360 * ((val - 50) / 100) + 'deg)';
        }

        for (let sheet of sheets) {
            if (sheet.cssRules !== null) {
                for (let rule of sheet.cssRules) {
                    if (rule.selectorText === selector_ring_left) {
                        rule.style["transform"] = replacementContent_ring_left;
                    }
                    if (rule.selectorText === selector_ring_right) {
                        rule.style["transform"] = replacementContent_ring_right;
                    }
                }
            }
        }

        this.setState({
            value_slider: val
        })
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="tab-container">
                    <div className="tab-clicks">
                        <input id="tab1" type="radio" className="tabs" name="tab1" checked={this.state.showTab1} onChange={this.onTabChange.bind(this)} />
                        <label htmlFor="tab1">Form</label>

                        <input id="tab2" type="radio" className="tabs" name="tab2" checked={this.state.showTab2} onChange={this.onTabChange.bind(this)} />
                        <label htmlFor="tab2">Report</label>
                    </div>
                    <div className="content row">
                        <div id="content1" className={this.state.showTab1 ? "disp_true" : "disp_false"}>
                            <form onSubmit={this.renderReport.bind(this)}>
                                <div className="col s6">
                                    <label htmlFor="first_name">First Name</label>
                                    <input placeholder="John" id="first_name" type="text" onChange={this.handleChange.bind(this)} />
                                </div>
                                <div className="col s6">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input placeholder="Doe" id="last_name" type="text" onChange={this.handleChange.bind(this)} />
                                </div>
                                <div className="col s12">
                                    <label htmlFor="value_slider">Value</label>
                                    <input id="value_slider" type="range" min="1" max="100" onChange={this.handleChange.bind(this)} />
                                </div>
                                <div className="col s6">
                                    <label htmlFor="first_name">Start Date</label>
                                    <input id="start_date" type="date" onChange={(e) => { this.setMaxDate(e); this.handleChange(e) }} />
                                </div>
                                <div className="col s6">
                                    <label htmlFor="first_name">End Date</label>
                                    <input id="end_date" type="date" min={this.state.maxDate} onChange={this.handleChange.bind(this)} />
                                </div>

                                <div className="col s1">
                                    <input id="submit-btn" className="waves-effect waves-light btn" type="submit" />
                                </div>
                            </form>
                        </div>
                        <div id="content2" className={this.state.showTab2 ? "row disp_true" : "row disp_false"}>
                            <div className="ring-base">
                                <div className="ring-left"></div>
                                <div className="ring-right"></div>
                                <div className="ring-cover">
                                    <div className="ring-text">{this.state.value_slider}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }

}