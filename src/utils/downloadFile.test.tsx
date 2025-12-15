import downloadFile from './downloadFile'

describe('downloadFile', () => {
    it('creates and triggers download', () => {
        // Mock DOM methods
        const mockClick = jest.fn()
        const mockAppendChild = jest.fn()
        const mockRemoveChild = jest.fn()
        const mockCreateObjectURL = jest.fn().mockReturnValue('blob:test')

        jest.spyOn(document, 'createElement').mockReturnValue({
            click: mockClick,
            href: '',
            download: '',
        } as any)
        jest.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild)
        jest.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild)
        window.URL.createObjectURL = mockCreateObjectURL

        downloadFile({
            filename: 'test.txt',
            contents: 'test content',
        })

        expect(mockAppendChild).toHaveBeenCalled()
        expect(mockClick).toHaveBeenCalled()
        expect(mockRemoveChild).toHaveBeenCalled()
    })
})
