import { Sucursal } from './sucursal.model';
import { Client } from './client.model';
import { Count } from './count';
import { mock, when, instance } from 'ts-mockito';
describe('Sucursal', () => {
  let cliente: Client;
  let sucursal: Sucursal;
  let cuenta: Count;
  var withdrawlAmount2000 = 200000;
  var numeroCuenta = 12345;
  var balance = 100000;

  beforeEach(() => {
    sucursal = new Sucursal("Alajuela", "Alajuela");
    cliente = new Client("Juan", "Pérez", "25-01-76", "2401-3117", "Alajuela", "jperez@gmail.com");
    sucursal.setClientes(cliente);
    cuenta = mock<Count>();
  });
  it('1. Saldo de cuenta', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    let mockito = instance(cuenta);
    expect(mockito.getCantidadDinero()).toBe(balance);
  });

  it('2. Agregar nueva cuenta a cliente', function () {
    var cuenta = mock<Count>();
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas().length).toBe(1);
  });
  it('3. Retirar monto válido', function () {
    var balanceAmount3000 = 300000;
    when(cuenta.getCantidadDinero()).thenReturn(balanceAmount3000);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    when(cuenta.retirar(withdrawlAmount2000)).thenReturn(balance);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    var saldo = cliente.retirar(withdrawlAmount2000, numeroCuenta);
    expect(saldo).toBe(balance);
  });
  it('4. Retirar más de lo permitido', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(function() {
      cliente.retirar(withdrawlAmount2000, numeroCuenta);
    }).toThrowError(Error, "Fondos insuficientes");
  });
  it('5. Apertura de cuenta con monto inicial de 5000 colones', function () {
    let nuevaCuenta = mock<Count>();
    when(nuevaCuenta.getCantidadDinero()).thenReturn(5000);
    let mockito = instance(nuevaCuenta);
    
    cliente.setCuentas(mockito);
    
    expect(cliente.getCuentas()[0].getCantidadDinero()).toBe(5000);
  }
);
it('6. Verificar dos depósitos válidos', function () {
  let nuevaCuenta = mock<Count>();
  let deposito1 = 2000;
  let deposito2 = 3000;
  
  when(nuevaCuenta.getCantidadDinero()).thenReturn(deposito1 + deposito2);
  let mockito = instance(nuevaCuenta);
  
  cliente.setCuentas(mockito); 
  
  mockito.depositar(deposito1);
  mockito.depositar(deposito2);
  
  expect(cliente.getCuentas()[0].getCantidadDinero()).toBe(deposito1 + deposito2);
});
it('7. Liquidar una cuenta de un cliente', function () {
  let cuenta1 = mock<Count>();
  let cuenta2 = mock<Count>();
  let mockito1 = instance(cuenta1);
  let mockito2 = instance(cuenta2);
  
  cliente.setCuentas(mockito1);
  cliente.setCuentas(mockito2); 

  cliente.cuentas = cliente.cuentas.filter(cuenta => cuenta !== mockito1); 

  expect(cliente.getCuentas().length).toBe(1); 
});
        
});


