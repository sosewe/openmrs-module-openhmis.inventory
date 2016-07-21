<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        {
            label: "${ ui.message("openhmis.inventory.page")}" ,
            link: '${ui.pageLink("openhmis.inventory", "inventoryLanding")}'
        },
        {
            label: "${ ui.message("openhmis.inventory.admin.task.dashboard")}",
            link: '/' + OPENMRS_CONTEXT_PATH + '/openhmis.inventory/inventory/inventoryTasksDashboard.page'
        },
        {
            label: "${ ui.message("openhmis.inventory.admin.reports")}",
            link: '/' + OPENMRS_CONTEXT_PATH + '/openhmis.inventory/reports/entities.page#/'
        }
    ];

    jQuery('#breadcrumbs').html(emr.generateBreadcrumbHtml(breadcrumbs));


</script>

<div id="reportPage">
<input id="reportUrl" type="hidden" value="{{ ui.message('openhmis.inventory.admin.reports')}}" />

<h2>{{ ui.message("openhmis.inventory.admin.reports")}}</h2>

<div class="report">
    <fieldset>
        <legend>
            <i class="icon-list-alt"></i>
            {{stockTakeReport.name}}
        </legend>
        <small>{{stockTakeReport.description}}</small>

        <ul class="table-layout">
            <li><label>Stockroom </label></li>
            <li>
                <select class="form-control" ng-model="StockTakeReport_stockroom" ng-options='stockroom.name for stockroom in stockrooms'>
                    <option value="" selected="selected">Select Stockroom</option>
                </select>
            </li>
        </ul>
        <ul class="table-layout">
            <li></li>
            <li><a class="btn btn-grey" ng-click="generateReport_StockTakeReport()">Generate Report</a></li>
        </ul>
    </fieldset>
</div>
<hr>

<div class="report">
    <fieldset>
        <legend>
            <i class="icon-list-alt"></i>
            {{stockCardReport.name}}
        </legend>
        <small>{{stockCardReport.description}}</small>
        <ul class="table-layout">
            <li><label>Stockroom </label></li>
            <li>
                <select  class="form-control" ng-model="stockCardReport_stockroom" ng-options='stockroom.name for stockroom in stockrooms'>
                    <option value="" ng-selected="selected">All Stockrooms</option>
                </select>
            </li>
        </ul>

        <ul class="table-layout">
            <li><label>Item</label></li>
            <li>
                ${ ui.includeFragment("openhmis.commons", "searchFragment", [
                        typeahead: ["reportItem.name for reportItem in searchReportItems(\$viewValue)"],
                        model: "stockCardReport_item",
                        typeaheadOnSelect: "setStockCardReportItem(\$item)",
                        typeaheadEditable: "true",
                        class: ["form-control report-item"],
                        placeholder: [ui.message('openhmis.inventory.item.enterItemSearch')]
                ])}
            </li>
        </ul>

        <ul class="table-layout">
            <li><label>Begin Date</label></li>
            <li>
                <span class="date">
                    ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                            formFieldName: "stockCardReport_beginDate",
                            id: "stockCardReport_beginDate",
                            label: "",
                            useTime: false
                    ])}
                </span>
            </li>
        </ul>

        <ul class="table-layout">
            <li><label>End Date</label></li>
            <li>
                <span class="date">
                    ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                            formFieldName: "stockCardReport_endDate",
                            id: "stockCardReport_endDate",
                            label: "",
                            useTime: false
                    ])}
                </span>
            </li>
        </ul>

        <ul class="table-layout">
            <li></li>
            <li><a class="btn btn-grey" ng-click="generateReport_StockCardReport()">Generate Report</a></li>
        </ul>
    </fieldset>
</div>
<hr>

<div class="report">
    <fieldset>
        <legend>
            <i class="icon-list-alt"></i>
            {{stockroomUsageReport.name}}
        </legend>
        <small>{{stockroomUsageReport.description}}</small>
        <ul class="table-layout">
            <li><label>Stockroom </label></li>
            <li>
                <select class="form-control" ng-model="stockroomUsage_stockroom" ng-options='stockroom.name for stockroom in stockrooms'>
                    <option value="" selected="selected">Select Stockroom</option>
                </select>
            </li>
        </ul>

        <ul class="table-layout">
            <li><label>Begin Date</label></li>
            <li>
                ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                        formFieldName: "stockroomUsage_beginDate",
                        id: "stockroomUsage_beginDate",
                        label: "",
                        useTime: false
                ])}
            </li>
        </ul>

        <ul class="table-layout">
            <li><label>End Date</label></li>
            <li>
                ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                        formFieldName: "stockroomUsage_endDate",
                        id: "stockroomUsage_endDate",
                        label: "",
                        useTime: false
                ])}
            </li>
        </ul>

        <ul class="table-layout">
            <li></li>
            <li><a class="btn btn-grey" ng-click="generateReport_StockroomUsage()">Generate Report</a></li>
        </ul>
    </fieldset>
</div>
<hr>


<div class="report">
    <fieldset>
        <legend>
            <i class="icon-list-alt"></i>
            {{expiringStockReport.name}}
        </legend>
        <small>{{expiringStockReport.description}}</small>
        <ul class="table-layout">
            <li><label>Stockroom </label></li>
            <li>
                <select  class="form-control" id="expiringStock-stockroom" ng-model="expiringStock_stockroom" ng-options='stockroom.name for stockroom in stockrooms'>
                    <option value="" selected="selected">All Stockrooms</option>
                </select>
            </li>
        </ul>

        <ul class="table-layout">
            <li><label>Expires by</label></li>
            <li>
                ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                        formFieldName: "expiringStock_expiresByDate",
                        id: "expiringStock_expiresByDate",
                        label: "",
                        useTime: false
                ])}
            </li>
        </ul>

        <ul class="table-layout">
            <li></li>
            <li><a class="btn btn-grey" ng-click="generateReport_ExpiringStock()">Generate Report</a></li>
        </ul>
    </fieldset>
</div>
</div>