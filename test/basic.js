'use strict';

const expect = require('chai').expect;
const lib = require('../index.js');

describe('basic', () => {
  it('type', done => {
    expect(lib).to.be.an('object');
    done();
  });
  it('type', done => {
    const cxt = lib.init();
    expect(cxt).to.be.an('object');
    console.log(cxt);
    done();
  });
  it('fail: foo bar', done => {
    const cxt = lib.init();
    expect(lib.execute(cxt, ' foo bar ???', '')).to.eq(1);
    expect(lib.getError(cxt)).to.eq(1);
    expect(lib.getReason(cxt)).to.eq('Expected declaration command');
    done();
  });
  it('$comment', done => {
    const cxt = lib.init();
    expect(lib.execute(cxt, ' \n $comment some text $end $comment more text $end ???', '')).to.eq(1);
    expect(lib.getError(cxt)).to.eq(1);
    expect(lib.getReason(cxt)).to.eq('Expected declaration command');
    expect(lib.getCommand(cxt)).to.eq(1);
    // expect(lib.getErrorPos(cxt)).to.eq('Expected declaration');
    done();
  });
  it('$version', done => {
    const cxt = lib.init();
    expect(lib.execute(cxt, `
$version Generated by VerilatedVcd $end
$date Wed Sep 18 22:59:07 2019
 $end
$timescale   1ns $end

  $scope   module   top    $end
    $var wire  1 "}G clock $end
    $scope module leaf $end
      $var wire 64 "}> counter [63:0] $end
    $upscope $end
`, null)).to.eq(1); expect(lib.execute(cxt, `
  $upscope $end

$enddefinitions $end

#1
0"}G
#2
1"}G
#3
0"}G

`, null)).to.eq(1);
    expect(lib.getError(cxt)).to.eq(1);
    // expect(lib.getReason(cxt)).to.eq('Expected simulation command');
    // expect(lib.getCommand(cxt)).to.eq(100);
    done();
  });
});

/* eslint-env mocha */
