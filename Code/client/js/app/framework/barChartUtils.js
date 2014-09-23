/**
 * app/framework/barChartUtils
 *
 * Visualization of Order in the form of a BarChart using the d3 library
 *
 * @author Anirudh Tewathia
 */




define(['jquery', 'd3'], function ($, d3) {
    'use strict';
    return (function(){

        // declaring variables
        var count,
        pColor = {'fill': '#FDBD5A'},
        eColor = {'fill': '#FD8300'},
        tColor = {'fill': '#FFF4CE'},
        xAxisFill = {'fill': 'none', 'shape-rendering': 'crispEdges', 'stroke': '#000'},
        // textColor = {'fill': '#000000'},
        placed = {},
        executed = {},
        total = {},
        orderList = {},
        margin,
        width,
        height,
        x,
        y,
        color,
        xAxis,
        yAxis,
        svg,
        state,
        xx,
        xAx;

        // initializing the bar chart holder onto the passed DOMNode
        function _draw (DOMNode) {
            count = 0;
            DOMNode.innerHTML = null;
            margin = {top: 40, right: 100, bottom: 30, left: 60};
            width = 70;
            height = 500 - margin.top - margin.bottom;
            x = d3.scale.linear().rangeRound([0, width]);
            y = d3.scale.linear();
            xx = d3.scale.linear().rangeRound([0, 600]);
            color = d3.scale.ordinal().range(['#a05d56', '#d0743c', '#ff8c00']);
            xAxis = d3.svg.axis().scale(xx).orient('top').tickFormat(d3.format('.0%'));
            yAxis = d3.svg.axis().scale(y).orient('left');
            svg = d3.select(DOMNode).append('svg')
            .attr('width', width + 20 + '%').attr('height', 22)
            .attr('class', 'barChartSVG')
            .append('g')
            .attr('transform', 'translate(' + margin.left +  ',' + margin.top + ')');
            svg.append('g').attr('class', 'x axis').call(xAxis);
            state = svg.selectAll('.state').append('g')
            .attr('class', 'state')
            .attr('transform', function () {
                return 'translate(0,0)';
            });

            svg.append('text').attr('transform', 'rotate(270)').attr('class', 'yLabelDesktop').text('Order Id').attr('x', -100).attr('y', -40);
            svg.append('text').attr('transform', 'rotate(0)').attr('class', 'yLabelMobile').text('Order Id').attr('x', -35).attr('y', -30);
            svg.append('text').attr('class', 'totalValues').text('Total').attr('x', width +4 +'%').attr('y', 0);
            $('path').remove();
            xAx = svg.append('g');
            xAx.append('rect').attr('y', -1)
            .attr('x', 0)
            .attr('height', 1)
            .attr('width', '70%');

            xAx.append('rect').attr('y', -6)
            .attr('x', width/2 -0.5 + '%')
            .attr('height', 6)
            .attr('width', 0.5);

            xAx.append('rect').attr('y', -6)
            .attr('x', width + '%')
            .attr('height', 6)
            .attr('width', 0.5);

            // makeLegends();

            // making the x-axis tick values responsive
            $('.tick>text').each(function (index, element) {
                $(element).parent().attr('transform', 'translate(0, 0)');
                var x = $(element).text().split('%')[0]/1.42 + '%';
                $(element).attr('x', x);
                if ($(element).text().split('%')[0] % 50 !== 0) {$(element).text('');}
            });

            $('.axis path, .axis line').attr(xAxisFill);

        }


        // adding a new order to the bar chart
        function _addRow(order) {
            var addPlaced = order.quantityPlaced,
            addExecuted = order.quantityExecuted,
            addTotal = order.quantity,
            addId = order.id,
            newOrder;

            // applying validations
            if(addPlaced > addTotal || addExecuted > addTotal || addExecuted > addPlaced) {
                throw new Error('Total Orders cannot be less than Orders Placed or Executed.');
            }
            if(addExecuted > addPlaced) {
                throw new Error('Executed Orders cannot be greater than Orders Placed.');
            }

            if(!svg) {
                return 0;
            }

            newOrder = svg.append('g').attr('class', 'orderBar');

            total[addId] = (newOrder.append('rect')
                .attr('actualValue', addTotal)
                .attr('width', addTotal*(x.range()[1]/addTotal) + '%')
                .attr('y', function () {
                    return 15+35*count;
                })
                .attr('height', 25)
                .attr(tColor));

            placed[addId] = (newOrder.append('rect')
                .attr('actualValue', addPlaced)
                .attr('width', addPlaced*(x.range()[1]/addTotal) + '%')
                .attr('y', function () {
                    return 15+35*count;
                })
                .attr('height', 25)
                .attr(pColor));

            executed[addId] = (newOrder.append('rect')
                .attr('actualValue', addExecuted)
                .attr('width', addExecuted*(x.range()[1]/addTotal) + '%')
                .attr('y', function () {
                    return 15+35*count;
                })
                .attr('height', 25)
                .attr(eColor));

            count++;
            newOrder.append('text')
            .attr('x', -12-3*('' + addId + '').length*2)
            .attr('y', 15+35*(count-0.5))
            .style('font-size', '0.9em')
            .text(addId);

            newOrder.append('text')
            .attr('x', width + 6 - ('' + addTotal+'').length*0.2 +'%')
            .attr('y', 15+35*(count-0.5))
            .style('font-size', '0.9em')
            .attr('class', 'totalValues')
            .text(addTotal);

            newOrder.append('rect')
            .attr('x', width + '%')
            .attr('height', 3)
            .attr('width', 7.5 + '%')
            .attr('y', 35*(count)+2)
            .attr('class', 'totalValues')
            .style('font-size', '0.9em')
            .attr(tColor);

            orderList[addId] = newOrder;
            $('svg').attr('height', 39+42+(35*count));

            if(count<3) {
                $('svg').attr('height', 42+35*3);
            }
        }


        // updating a preexisting order bar
        function _updateRow (order) {
            if(!svg) {
                return 0;
            }

            var updatePlaced = order.quantityPlaced,
                updateExecuted = order.quantityExecuted,
                index = order.id,
                addOrders = total[index].attr('actualValue');
            placed[index].attr('width', updatePlaced*(x.range()[1]/addOrders) + '%');
            executed[index].attr('width', updateExecuted*(x.range()[1]/addOrders) + '%');
        }

        function _getCount() {
            return count;
        }

        return {
            draw : _draw,
            addRow : _addRow,
            updateRow : _updateRow,
            p: placed,
            e: executed,
            t: total,
            o: orderList,
            orderCount: _getCount
        };
    }());

});
