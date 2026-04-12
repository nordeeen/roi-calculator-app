import { render, screen, fireEvent } from '@testing-library/react';
import ButtonSave from './ButtonSave';

describe('ButtonSave', () => {
  const defaultProps = {
    allEmpty: false,
    onSave: jest.fn(),
    labelBtn: 'Simpan',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('merender button dengan label dan type yang benar', () => {
    render(<ButtonSave {...defaultProps} labelBtn="Simpan Data" />);
    const btn = screen.getByRole('button', { name: 'Simpan Data' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('button aktif/disabled sesuai prop allEmpty', () => {
    const { rerender } = render(
      <ButtonSave {...defaultProps} allEmpty={false} />,
    );
    expect(screen.getByRole('button')).not.toBeDisabled();

    rerender(<ButtonSave {...defaultProps} allEmpty={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('memanggil onSave tepat sekali saat diklik, tidak memanggil onSave saat disabled', () => {
    const onSave = jest.fn();

    const { rerender } = render(
      <ButtonSave {...defaultProps} onSave={onSave} allEmpty={false} />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onSave).toHaveBeenCalledTimes(1);

    rerender(<ButtonSave {...defaultProps} onSave={onSave} allEmpty={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
